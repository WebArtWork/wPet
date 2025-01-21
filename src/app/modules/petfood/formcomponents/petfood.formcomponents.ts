export const petfoodFormComponents = {
	formId: 'petfood',
	title: 'Petfood',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petfood title',
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
					value: 'fill petfood description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
