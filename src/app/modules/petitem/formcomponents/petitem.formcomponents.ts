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
