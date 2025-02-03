export const petitemFormComponents = {
	formId: 'petitem',
	title: 'Petitem',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petitem title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'itemtype',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petfood item type',
				},
				{
					name: 'Label',
					value: 'Item type',
				}
			]
		},
		{
			name: 'Text',
			key: 'material',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petfood material',
				},
				{
					name: 'Label',
					value: 'Material',
				}
			]
		},
		{
			name: 'Text',
			key: 'price',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petfood price',
				},
				{
					name: 'Label',
					value: 'Price',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petitem description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
