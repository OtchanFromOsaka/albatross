import { useState, useEffect } from "hono/jsx";

type Image = {
	id: string;
	src: string;
	height: number;
	width: number;
};

type Column = {
	id: string;
	images: Array<Image>;
	height: number;
};

/** 列幅 */
const COLUMN_WIDTH = 300;

/** 画像のマージン(px) */
const IMAGE_MARGIN = 10;

/** (テスト用) 画像パターン */
const IMAGES_PATTERN: Array<Omit<Image, "id">> = [
	{ src: "", height: 2160, width: 3840 }, // 16:9
	{ src: "", height: 3840, width: 2160 }, // 9:16
	{ src: "", height: 8640, width: 5760 }, // 3:2
	{ src: "", height: 5760, width: 8640 }, // 3:2
	{ src: "", height: 2560, width: 2560 }, // 1:1
];

/** (テスト用) 画像パターンからランダムに50個 */
const images: Array<Image> = Array.from({ length: 50 }, (_, i) => {
	const randomIndex = Math.floor(Math.random() * IMAGES_PATTERN.length);
	const randomImage = IMAGES_PATTERN[randomIndex];
	return randomImage
		? { id: `img-${i}`, ...randomImage }
		: { id: `img-${i}`, src: "", height: 0, width: 0 };
});

/** 列数を算出して返す */
function calcColumns(windowWidth: number): number {
	const fixedWidth = windowWidth - IMAGE_MARGIN;
	return Math.max(1, Math.floor(fixedWidth / (COLUMN_WIDTH + IMAGE_MARGIN)));
}

function sortImages(images: Array<Image>, columnCount: number) {
	// 列数のぶんだけカラムの配列を作成し、画像をそれぞれ1個だけ振り分ける
	const columns: Array<Column> = [];
	for (let i = 0; i < columnCount; i++) {
		const image = images[i];
		const id = image?.id || `placeholder-${i}`;
		const src = image?.src || "";
		const height = image
			? Math.floor((image.height * COLUMN_WIDTH) / image.width)
			: 0; // changed
		const width = image?.width ? COLUMN_WIDTH : 0;
		columns.push({
			id: `column-${i}`,
			images: [{ id, src, height, width }],
			height,
		});
	}

	// 残りの画像について columns.height が最小のカラムに順番に振り分ける
	for (let i = columnCount; i < images.length; i++) {
		const image = images[i];
		if (!image) continue;

		const id = image.id;
		const src = image.src || "";
		const height = Math.floor((image.height * COLUMN_WIDTH) / image.width);
		const width = COLUMN_WIDTH;

		// 高さが最小のカラムに画像を追加
		const minColumn = columns.reduce((prev, curr) =>
			prev.height < curr.height ? prev : curr,
		);
		minColumn.images.push({ id, src, height, width });
		minColumn.height += height + 10;
	}

	return columns;
}

export default function MasonryGallery() {
	// windowsWidth をもとに算出したカラム数
	const initialColumnCount = calcColumns(
		typeof window === "undefined" ? 0 : window.innerWidth,
	);
	const [columnCount, setColumnCount] = useState(initialColumnCount);

	// ウィンドウサイズ変更時のカラム数再計算
	useEffect(() => {
		if (typeof window === "undefined") return;
		const recalc = () => {
			setColumnCount((prev) => {
				const next = calcColumns(window.innerWidth);
				return prev === next ? prev : next;
			});
		};
		window.addEventListener("resize", recalc);
		recalc();
		return () => window.removeEventListener("resize", recalc);
	}, []);

	// カラムごとに振り分けた画像
	const imagesByColumn = sortImages(images, columnCount);

	// レンダリング
	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				{imagesByColumn.map((column) => (
					<div
						key={column.id}
						style={{
							width: `${COLUMN_WIDTH}px`,
							margin: "0 0 0 10px",
							padding: "10px 0",
						}}
					>
						{column.images.map((image) => (
							<div
								key={image.id}
								style={{
									backgroundColor: "#007f003f",
									height: `${image.height}px`,
									width: `${image.width}px`,
									borderRadius: "10px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									textAlign: "center",
									marginTop: "10px",
								}}
							>
								{image.id}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
