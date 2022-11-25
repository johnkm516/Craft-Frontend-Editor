export interface Page {
    id: number;
    page_id: string;
    pageName: string;
    pageRoute: string | null;
    pageData: string;
    deviceType: string;
    time: Date;
}