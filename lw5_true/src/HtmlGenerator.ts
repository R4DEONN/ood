import {DocumentItem} from "./DocumentItem";

function generateHtml(title: string, items: DocumentItem[]) {
	const itemsHtml = items.reduce((acc, item) => {
		const image = item.getImage();
		const p = item.getParagraph();
		if (image) {
			return acc + `<img src='${image.getPath()}' style="width: ${image.getWidth()}; height: ${image.getHeight()};" alt='document image' />`
		} else if (p) {
			return acc + `<p>${p.getText()}</p>`;
		}

		return acc;
	}, "")

	return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<title>${title}</title>	
		</head>
		<body>
			${itemsHtml}
		</body>
	</html>
	`
}