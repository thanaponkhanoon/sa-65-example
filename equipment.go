package entity

import (
	"time"

	"gorm.io/gorm"
)

// equipment
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

	BorrowList []BorrowList `gorm:"foreignKey:EquipmentID"`
}
