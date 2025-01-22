export const petstoreFormComponents = {
	formId: 'petstore',
	title: 'Petstore',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petstore title',
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
					value: 'fill petstore description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
