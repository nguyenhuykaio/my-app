
export class ITicketSearch {
    _id: string;
    url: string;
    external_id: string;
    created_at: string;
    type?: string;
    subject: string;
    description?: string;
    priority: string;
    status: string;
    submitter_id: number;
    assignee_id?: number;
    organization_id?: number;
    tags: string[];
    has_incidents: boolean;
    due_at?: string;
    via: string;
}

export interface ITicket extends ITicketSearch {
    assignee_name?: string
    submitter_name?: string
    organization_name?: string
}