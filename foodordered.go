package entity

import (
	"time"

	"gorm.io/gorm"
)

///////////////////////////////////////////////////////
//food

type FoodPaymentType struct {
	gorm.Model //เอาไว้ hold พวก Pk (FoodPaymentTypeID)

	Name string

	FoodOrdereds []FoodOrdered `gorm:"foreignKey:FoodPaymentTypeID"`
}

type FoodSet struct {
	gorm.Model //เอาไว้ hold พวก Pk (FoodSetID)

	Name   string
	Detail string
	Price  int

	FoodOrderedFoodSets []FoodOrderedFoodSet `gorm:"foreignKey:FoodSetID"`
}

type FoodOrderedFoodSet struct {
	gorm.Model
	FoodOrderedID *uint
	FoodOrdered   FoodOrdered `references:"ID"`

	FoodSetID *uint
	FoodSet   FoodSet `references:"ID"`

	Quantity uint
}

type FoodOrdered struct {
	gorm.Model //เอาไว้ hold พวก Pk (FoodOrderedID)
	FoodTime   time.Time
	TotalPrice int

	FoodPaymentTypeID *uint
	FoodPaymentType   FoodPaymentType

	BookingID *uint
	Booking   Booking

	FoodOrderedFoodSets []FoodOrderedFoodSet `gorm:"foreignKey:FoodOrderedID"`
}
