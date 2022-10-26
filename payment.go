package entity

import (
	"time"

	"gorm.io/gorm"
)

// //////////////////////////////////////////////////////////////////////////////////
// bill
type PaymentType struct {
	gorm.Model
	Name string
	Bill []Bill `gorm:"foreignKey:PaymentTypeID"`
}

type Bill struct {
	gorm.Model

	BillTime time.Time

	EmployeeID *uint
	Employee   Employee

	PaymentTypeID *uint
	PaymentType   PaymentType

	BookingID *uint   `gorm:"uniqueIndex"`
	Booking   Booking `gorm:"constraint:OnDelete:CASCADE"` //belong to ลบใบลงทะเบียน บิลหาย

	FoodOrderedID *uint
	FoodOrdered   FoodOrdered

	TotalPrice uint
}
