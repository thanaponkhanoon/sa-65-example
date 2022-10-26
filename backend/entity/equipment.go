package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	FirstName string
	LastName  string
	Email     string `gorm:"uniqueIndex"`
	Password  string

	//1 employee เป็นเจ้าของได้หลาย equipment
	Equipments []Equipment `gorm:"foreignKey:EmployeeID"`
}

type Category struct {
	gorm.Model
	Name string

	Equipments []Equipment `gorm:"foreignKey:CategoryID"`
}

type Unit struct {
	gorm.Model
	Name string

	Equipments []Equipment `gorm:"foreignKey:UnitID"`
}

type Equipment struct {
	gorm.Model
	Time time.Time

	Name   string
	Amount int

	// CategoryID ทำหน้าที่เป็น FK
	CategoryID *uint
	Category   Category `gorm:"references:id"`

	// UnitID ทำหน้าที่เป็น FK
	UnitID *uint
	Unit   Unit `gorm:"references:id"`

	// EmployeeID ทำหน้าที่เป็น FK
	EmployeeID *uint
	Employee   Employee `gorm:"references:id"`
}
