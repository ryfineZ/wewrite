/**
 * Proofread menu implmentation.
 * with help of ChatGPT and DeepSeek
 * Author: Learner Chen
 * Last updated: 2025.2.4
 */
import { RangeSetBuilder, StateEffect, StateField } from "@codemirror/state";
import {
	Decoration,
	DecorationSet,
	EditorView,
	ViewPlugin,
	ViewUpdate,
} from "@codemirror/view";
import { Editor, MarkdownView, Notice } from "obsidian";
// ==========  CodeMirror 6 高亮错误文本 ==========
export interface PROOFREAD_SUGGESTION {
	type?: string;
	description?: string;
	start: number;
	end: number;
	original?: string;
	suggestion: string;
}
export const addProofreadEffect = StateEffect.define<PROOFREAD_SUGGESTION>();
const removeHighlightEffect = StateEffect.define<{
	from: number;
	to: number;
}>();

export const proofreadStateField = StateField.define<DecorationSet>({
	create() {
		return Decoration.none;
	},
	update(decorations, transaction) {
		// 映射已有的装饰到新的文档状态
		let newDecos = decorations.map(transaction.changes);
		const builder = new RangeSetBuilder<Decoration>();

		// 添加现有装饰
		newDecos.between(0, transaction.newDoc.length, (from, to, value) => {
			builder.add(from, to, value);
		});

		// 添加新效果
		for (const effect of transaction.effects) {
			if (effect.is(addProofreadEffect)) {

				const { start, end, suggestion, original } = effect.value;
				// 映射位置到新文档
				// TODO: 映射位置到新文档, string index 需要映射 editor 的 index

				const from = transaction.changes.mapPos(start);
				const to = transaction.changes.mapPos(end);

				const deco = Decoration.mark({
					class: "proofread-error",
					attributes: {
						"data-suggestion": suggestion,
						"data-from": `${from}`,
						"data-to": `${to}`,
					},
				});
				builder.add(from, to, deco);
			} else if (effect.is(removeHighlightEffect)) {
				return decorations.update({
					filter: (from, to) =>
						from !== effect.value.from || to !== effect.value.to,
				});
			}
		}

		return builder.finish();
	},
	provide: (field) => EditorView.decorations.from(field),
});

export const proofreadPlugin = ViewPlugin.fromClass(
	class {
		decorations: DecorationSet;
		private menu: HTMLDivElement | null = null;
		private view: EditorView;

		constructor(view: EditorView) {
			this.view = view;
			this.decorations = view.state.field(proofreadStateField);
			view.dom.addEventListener("mouseover", this.handleHover);
		}

		update(update: ViewUpdate) {
			this.decorations = update.state.field(proofreadStateField);
		}

		handleHover = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.classList.contains("proofread-error")) return;

			const suggestion = target.getAttribute("data-suggestion");
			if (!suggestion) return;

			this.showSuggestionMenu(
				event.clientX,
				event.clientY,
				target,
				suggestion
			);
		};

		showSuggestionMenu(
			x: number,
			y: number,
			target: HTMLElement,
			suggestion: string
		) {
			if (this.menu) this.menu.remove();

			this.menu = document.createElement("div");
			this.menu.classList.add("proofread-menu");
			this.menu.style.left = `${x}px`;
			this.menu.style.top = `${y}px`;

			const suggestionText = document.createElement("div");
			suggestionText.classList.add("suggestion");
			suggestionText.innerText = suggestion;
			this.menu.appendChild(suggestionText);

			const acceptButton = document.createElement("button");
			acceptButton.textContent = "✅";
			acceptButton.onclick = () => {
				this.replaceText(target, suggestion);
				this.menu?.remove();
			};

			const ignoreButton = document.createElement("button");
			ignoreButton.textContent = "❌";
			ignoreButton.onclick = () => {
				this.removeHighlight(target);
				this.menu?.remove();
			};

			this.menu.appendChild(acceptButton);
			this.menu.appendChild(ignoreButton);
			document.body.appendChild(this.menu);
			this.menu.addEventListener("mouseleave", () => {
				this.menu?.remove();
			});
		}

		replaceText(target: HTMLElement, suggestion: string) {
			const from = parseInt(target.getAttribute("data-from") || "0");
			const to = parseInt(target.getAttribute("data-to") || "0");
			this.view.dispatch({
				changes: { from, to, insert: suggestion },
				effects: removeHighlightEffect.of({ from, to }),
			});
		}

		removeHighlight(target: HTMLElement) {
			const from = parseInt(target.getAttribute("data-from") || "0");
			const to = parseInt(target.getAttribute("data-to") || "0");
			this.view.dispatch({
				effects: removeHighlightEffect.of({ from, to }),
			});
		}
	},
	{
		decorations: (v) => v.decorations,
	}
);

export function proofreadText(
	editor: Editor,
	view: MarkdownView,
	suggestions: Array<PROOFREAD_SUGGESTION> | undefined = undefined
) {
	const text = editor.getValue();

	if (!suggestions) {
		suggestions = getProofreadSuggestions(text);
	}

	// 正确获取CodeMirror实例
	type EditorWithCm = Editor & { cm?: EditorView };
	const cmEditor = (view.editor as EditorWithCm).cm;

	if (!cmEditor) {
		new Notice("无法获取编辑器实例");
		return;
	}

	// 获取当前文档的 ChangeSet
	const changes = cmEditor.state.changes();

	if (changes === undefined || changes === null) {
		const effects = suggestions.map((suggestion) =>
			addProofreadEffect.of(suggestion)
		);

		cmEditor.dispatch({ effects });
	} else {
		const effects = suggestions.map((suggestion) => {
			// 使用 mapPos 将字符串索引映射到当前文档的位置
			const from = changes.mapPos(suggestion.start);
			const to = changes.mapPos(suggestion.end);
			return addProofreadEffect.of({
				...suggestion,
				start: from,
				end: to,
			});
		});

		cmEditor.dispatch({ effects });
	}
}

export function getProofreadSuggestions(
	text: string
): Array<PROOFREAD_SUGGESTION> {
	return [
		{ start: 16, end: 19, suggestion: "The" },
		{ start: 40, end: 46, suggestion: "人民" },
		{
			type: "拼写",
			start: 142,
			end: 153,
			description: "“竞相开放”中的“竟”应为“竞”，属于同音字误用。",
			suggestion: "环境",
		},
	];

	return [
		{
			type: "拼写",
			start: 23,
			end: 25,
			description: "“竞相开放”中的“竟”应为“竞”，属于同音字误用。",
			suggestion: "将“竟相开放”改为“竞相开放”。",
		},
		{
			type: "语法",
			start: 7,
			end: 11,
			description:
				"“稍作停顿后，我用手机拍下了几张照片作为纪念”中，“稍作停顿后”与上下文逻辑不够连贯，显得突兀。",
			suggestion: "修改为“稍作休息时，我用手机拍下了几张照片作为纪念”。",
		},
		{
			type: "修辞",
			start: 498,
			end: 502,
			description:
				"“别具一格”虽无明显错误，但与上下文语境略显生硬，未能准确表达红玫瑰的美感。",
			suggestion: "可替换为“娇艳欲滴”以增强画面感。",
		},
		{
			type: "修辞",
			start: 682,
			end: 686,
			description:
				"“自然的壮丽”表述较为笼统，与前文描述的公园场景不符，缺乏具体性。",
			suggestion: "改为“自然的美好”，更贴合公园散步的情境。",
		},
	];
}
// const editorView = target.closest(".cm-editor") as any;
// if (!editorView || !editorView.cm) return;

// const cmEditor: EditorView = editorView.cm;
