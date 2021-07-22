import { SectionItem } from './SectionItem';

export class AppSection {
    SectionID: Number;
    AppType: string;
    WarehouseID: Number;
    SectionName: string;
    SectionType: string;
    SectionSubType: string;
    CreatedDate: Date;
    UpdatedDate: Date;
    IsTile: boolean;
    IsBanner: boolean;
    IsPopUp: boolean;
    Sequence: Number;
    RowCount: Number;
    ColumnCount: Number;
    HasBackgroundColor: boolean;
    TileBackgroundColor: string;
    BannerBackgroundColor: string;
    HasHeaderBackgroundColor: boolean;
    TileHeaderBackgroundColor: string;
    HasBackgroundImage: boolean;
    TileBackgroundImage: string;
    HasHeaderBackgroundImage: boolean;
    TileHeaderBackgroundImage: string;
    TileAreaHeaderBackgroundImage: string;
    sectionBackgroundImage: string;
    IsTileSlider: boolean;
    HeaderTextColor: string;
    Deleted: boolean;
    Active: boolean;
    AppItemsList: SectionItem[];
    ViewType: string;
    WebViewUrl: string;
    HeaderTextColors: string;

    constructor(data?: AppSection) {
        data.SectionID ? this.SectionID = data.SectionID : null;
        data.AppType ? this.AppType = data.AppType : '';
        data.WarehouseID ? this.WarehouseID = data.WarehouseID : null;
        data.SectionName ? this.SectionName = data.SectionName : '';
        data.SectionType ? this.SectionType = data.SectionType : '';
        data.SectionSubType ? this.SectionSubType = data.SectionSubType : '';
        data.CreatedDate ? this.CreatedDate = data.CreatedDate : new Date();
        data.UpdatedDate ? this.UpdatedDate = data.UpdatedDate : new Date();
        data.UpdatedDate ? this.UpdatedDate = data.UpdatedDate : new Date();
        data.IsTile ? this.IsTile = data.IsTile : false;
        data.IsBanner ? this.IsBanner = data.IsBanner : false;
        data.IsPopUp ? this.IsPopUp = data.IsPopUp : false;
        data.Sequence ? this.Sequence = data.Sequence : null;
        data.RowCount ? this.RowCount = data.RowCount : null;
        data.ColumnCount ? this.ColumnCount = data.ColumnCount : null;
        data.HasBackgroundColor ? this.HasBackgroundColor = data.HasBackgroundColor : false;
        data.TileBackgroundColor ? this.TileBackgroundColor = data.TileBackgroundColor : '';
        data.BannerBackgroundColor ? this.BannerBackgroundColor = data.BannerBackgroundColor : '';
        data.HasHeaderBackgroundColor ? this.HasHeaderBackgroundColor = data.HasHeaderBackgroundColor : false;
        data.TileHeaderBackgroundColor ? this.TileHeaderBackgroundColor = data.TileHeaderBackgroundColor : '';
        data.HasBackgroundImage ? this.HasBackgroundImage = data.HasBackgroundImage : false;
        data.TileBackgroundImage ? this.TileBackgroundImage = data.TileBackgroundImage : '';
        data.HasHeaderBackgroundImage ? this.HasHeaderBackgroundImage = data.HasHeaderBackgroundImage : false;
        data.TileHeaderBackgroundImage ? this.TileHeaderBackgroundImage = data.TileHeaderBackgroundImage : '';
        data.TileAreaHeaderBackgroundImage ? this.TileAreaHeaderBackgroundImage = data.TileAreaHeaderBackgroundImage : '';
        data.sectionBackgroundImage ? this.sectionBackgroundImage = data.sectionBackgroundImage : '';
        data.IsTileSlider ? this.IsTileSlider = data.IsTileSlider : false;
        data.HeaderTextColor ? this.HeaderTextColor = data.HeaderTextColor : '';
        data.Deleted ? this.Deleted = data.Deleted : false;
        data.Active ? this.Active = data.Active : false;
        data.AppItemsList ? this.AppItemsList = data.AppItemsList : [];
        data.ViewType ? this.ViewType = data.ViewType : '';
        data.WebViewUrl ? this.WebViewUrl = data.WebViewUrl : '';
        data.HeaderTextColors ? this.HeaderTextColors = data.HeaderTextColors : '';
    }

}