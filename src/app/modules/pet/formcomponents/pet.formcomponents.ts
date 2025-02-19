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
					value: 'fill pet name'
				},
				{
					name: 'Label',
					value: 'Name'
				}
			]
		},
		{
			name: 'Select',
			key: 'species',
			fields: [
				{
					name: 'Placeholder',
					value: 'choose pet species'
				},
				{
					name: 'Label',
					value: 'Species'
				},
				{
					name: 'Items',
					value: ['Cat', 'Dog']
				}
			]
		},
		{
			name: 'Select',
			key: 'breed',
			fields: [
				{
					name: 'Placeholder',
					value: 'choose pet breed'
				},
				{
					name: 'Label',
					value: 'Breed'
				},
				{
					name: 'Items',
					value: ['White', 'Black']
				}
			]
		},
		{
			name: 'Text',
			key: 'age',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill pet age'
				},
				{
					name: 'Label',
					value: 'Age'
				}
			]
		},
		{
			name: 'Select',
			key: 'gender',
			fields: [
				{
					name: 'Placeholder',
					value: 'choose pet gender'
				},
				{
					name: 'Label',
					value: 'Gender'
				},
				{
					name: 'Items',
					value: ['Male', 'Female']
				}
			]
		},
		{
			name: 'Boolean',
			key: 'adoptable',
			fields: [
				{
					name: 'Label',
					value: 'Adoptable'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill pet description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Label',
					value: 'photo'
				}
			]
		}
	]
};
