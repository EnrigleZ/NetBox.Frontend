
export interface IGitCommit {
    id: string;
    message: string;
    url: string;
    committer: string;
    timestamp: number;
    ref: string;
    qa_checked: string;
}
