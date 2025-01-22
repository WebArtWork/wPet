export const petplaceFormComponents = {
	formId: 'petplace',
	title: 'Petplace',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petplace title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petplace description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
