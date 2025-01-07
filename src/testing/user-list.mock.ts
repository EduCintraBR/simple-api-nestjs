import { Role } from "../enums/role.enum";

export const userListMock = [
    {
		email: "eduardo.cintra@gmail.com",
		name: "Eduardo Cintra",
		password: "$2b$10$t7EWWtW.ql.BsFWlD4NdtOUoOB0hJEUin3UYvKCxmc5ezHVdrn0su",
		role: Role.ADMIN
	},
	{
		email: "yasmin.weber@gmail.com",
		name: "Yasmin Weber",
		password: "$2b$10$GMZ/QRBV9tam4lJyQCnop.E1hXQWLx4bwjAnKwqNpud8jjtnI6mL.",
		role: Role.USER
	},
	{
		email: "Chris.alemao@gmail.com",
		name: "Chris Scheneider",
		password: "$2b$10$JJlq6.aTbSKWZymswwTRFeAJIvwsVdFTS0zjl3gIT6oJOZle1kEJm",
		role: Role.USER
	},
	{
		email: "gabs.pereira@gmail.com",
		name: "Gabs Pereira",
		password: "$2b$10$pMMcRUw6.Z62y4Vm7pDmxuRXhYv9bQxI/4pWyi9WKkecCsZ3CmPdq",
		role: Role.USER
	}
]