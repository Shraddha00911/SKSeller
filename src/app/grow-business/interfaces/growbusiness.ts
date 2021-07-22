export interface AppBannerRequestDC {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any;
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number
    Type:string
    AppBannerDiscription:string

}

export interface NotificationRequest {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number
    NotificationDescription:string
    NotificationTitle:string
}

export interface MurliRequest {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number
    MurliDescription:string
    MurliNotificationTitle:string
}

export interface BrandStoreRequest {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number,
    CategoryId:number
}

export interface FlashDealRequest  {
    ImageUrl :string
    StartDate :Date
    EndDate :Date
    SubCatId :number
    WarehouseIds :any
    Comment :string
    ApprovedDate :Date
    IsApproved :boolean
    ApprovedBy :number
    ItemId:number
    AvailableQty:number
    MaxQty:number
    FlashDealPrice:DoubleRange
    FlashDealRequestItems:any[]
}

// export interface WarehouseIds{
//     WarehouseId:number
// }