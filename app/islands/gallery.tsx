import { useState, useEffect } from "hono/jsx";

import { apiClientV1 } from "@/routes/api/api-client";

interface Image {
	id: string;
	src: string;
	height: number;
	width: number;
}

/** 列幅 */
const COLUMN_WIDTH = 300;

/** 画像のマージン(px) */
const IMAGE_MARGIN = 10;

export default function Gallery() {
	// 画像一覧
	const [images, setImages] = useState<Array<Image>>([]);

	// 画像データの取得
	useEffect(() => {
		const fetchImages = async () => {
			const response = await apiClientV1.images.$post();
			if (response.status === 401) {
				window.location.href = "/login";
				return;
			}
			const images = await response.json();
			setImages(images);
		};
		fetchImages();
	}, []);

	// レンダリング
	return (
		<>
			{images.map((image) => (
				<div>
					<img
						key={image.id}
						src={image.src}
						alt={image.id}
						style={{
							height: `${image.height}px`,
							width: `${image.width}px`,
							borderRadius: "10px",
							marginTop: "10px",
						}}
					/>
				</div>
			))}
		</>
	);
}
