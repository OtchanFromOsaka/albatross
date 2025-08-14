import { useState, useEffect } from "hono/jsx";

interface Image {
	id: string;
	src: string;
	height: number;
	width: number;
}

interface Column {
	id: string;
	images: Array<Image>;
	height: number;
}

/** 列幅 */
const COLUMN_WIDTH = 300;

/** 画像のマージン(px) */
const IMAGE_MARGIN = 10;

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
	const [images, setImages] = useState<Array<Image>>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [columnCount, setColumnCount] = useState(1);

	// 画像データの取得
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch("/images.json");
				const imageData = await response.json();
				setImages(imageData);
			} catch (error) {
				console.error("Failed to fetch images:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchImages();
	}, []);

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

	// ローディング表示
	if (isLoading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "200px",
				}}
			>
				Loading images...
			</div>
		);
	}

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
							<img
								key={image.id}
								src={image.src}
								alt={image.id}
								style={{
									height: `${image.height}px`,
									width: `${image.width}px`,
									borderRadius: "10px",
									// display: "flex",
									// alignItems: "center",
									// justifyContent: "center",
									// textAlign: "center",
									marginTop: "10px",
								}}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
