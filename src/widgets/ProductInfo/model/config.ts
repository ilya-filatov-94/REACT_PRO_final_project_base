type ConfigItem = {
	label: string;
	value: keyof Product;
	renderValue?: ((product: Product) => string) | null;
};

export const configInfo: ConfigItem[] = [
	{
		label: 'Вес',
		value: 'wight',
		renderValue: () => '1 шт 120-200 грамм',
	},
	{
		label: 'Цена',
		value: 'price',
		renderValue: (product: Product) => `${product?.price - product?.discount}`,
	},
	{
		label: 'Польза',
		value: 'description',
		renderValue: null,
	},
];
