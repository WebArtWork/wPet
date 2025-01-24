export const petallergyFormComponents = {
	formId: 'petallergy',
	title: 'Allergy',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petallergy title',
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
					value: 'fill petallergy description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
