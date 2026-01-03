import { App, Modal } from "obsidian";
import { $t } from "src/lang/i18n";

export class SynonymsModal extends Modal {
	private resolve: (value: string | null) => void;
	private selectedIndex = 0;

	constructor(
		app: App,
		private synonyms: string[],
		resolve: (value: string | null) => void
	) {
		super(app);
		this.resolve = resolve;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		
		const container = contentEl.createDiv('synonyms-container');
		container.addClass('synonyms-modal');
		
		const list = container.createEl('ul');
		list.addClass('synonyms-list');
		
		this.synonyms.forEach((synonym, index) => {
			const item = list.createEl('li');
			item.setText(synonym);
			item.addClass('synonym-item');
			
			if (index === this.selectedIndex) {
				item.addClass('selected');
			}
			
			item.onClickEvent(() => {
				this.resolve(synonym);
				this.close();
			});
			
			item.onmouseenter = () => {
				this.updateSelection(index);
			};
		});

		this.scope.register([], 'ArrowUp', (evt) => {
			evt.preventDefault();
			this.updateSelection(Math.max(0, this.selectedIndex - 1));
		});
		
		this.scope.register([], 'ArrowDown', (evt) => {
			evt.preventDefault();
			this.updateSelection(Math.min(this.synonyms.length - 1, this.selectedIndex + 1));
		});
		
		this.scope.register([], 'Enter', (evt) => {
			evt.preventDefault();
			this.resolve(this.synonyms[this.selectedIndex]);
			this.close();
		});
		
		this.scope.register([], 'Space', (evt) => {
			evt.preventDefault();
			this.resolve(this.synonyms[this.selectedIndex]);
			this.close();
		});
		
		this.scope.register([], 'Escape', () => {
			this.resolve(null);
			this.close();
		});
	}

	private updateSelection(index: number) {
		const items = this.contentEl.querySelectorAll('.synonym-item');
		items[this.selectedIndex]?.removeClass('selected');
		this.selectedIndex = index;
		items[this.selectedIndex]?.addClass('selected');
		
		const selectedItem = items[this.selectedIndex];
		selectedItem?.scrollIntoView({ block: 'nearest' });
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
