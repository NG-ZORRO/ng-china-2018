declare namespace github {
  export interface Search {
    total_count: number;
    incomplete_results: boolean;
    items: ItemsItem[];
  }
  export interface ItemsItem {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: User;
    labels: LabelsItem[];
    state: string;
    locked: boolean;
    assignee: null | Assignee;
    assignees: AssigneesItem[];
    milestone: null;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: null | string;
    author_association: string;
    pull_request?: Pull_request;
    body: string;
    score: number;
  }
  export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }
  export interface Pull_request {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
  }
  export interface LabelsItem {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    'default': boolean;
  }
  export interface Assignee {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }
  export interface AssigneesItem {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }
  export interface IssueQueryParams {
    repo?: string;
    label?: string;
    state?: 'closed' | 'open';
    updated?: Date;
  }
}
