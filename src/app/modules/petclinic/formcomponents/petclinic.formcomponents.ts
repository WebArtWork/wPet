export const petclinicFormComponents = {
	formId: 'petclinic',
	title: 'Petclinic',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petclinic title',
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
					value: 'fill petclinic description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
