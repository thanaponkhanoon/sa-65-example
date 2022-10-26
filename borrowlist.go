package entity

import (
	"time"

	"gorm.io/gorm"
)

/////////////////////////////////////////////////////////////////////////////
//borrowlist

type BorrowList struct {
	gorm.Model

	BorrowTime time.Time
	Amount     int

	EquipmentID *uint
	Equipment   Equipment `gorm:"references:ID"`

	MemberID *uint
	Member   User `gorm:"references:ID"`

	EmployeeID *uint
	Employee   Employee `gorm:"references:ID"`
}
