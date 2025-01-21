export const petFormComponents = {
	formId: 'pet',
	title: 'Pet',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill pet title',
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
					value: 'fill pet description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
