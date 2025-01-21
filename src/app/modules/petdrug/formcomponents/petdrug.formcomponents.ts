export const petdrugFormComponents = {
	formId: 'petdrug',
	title: 'Petdrug',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petdrug title',
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
					value: 'fill petdrug description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
