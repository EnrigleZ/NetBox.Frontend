import { pages } from '../config/pages';

type PagesType = typeof pages;

declare global {
    const IS_DEV: boolean;
    const SITE_PAGES: PagesType;
    const COMMIT_HASH: string;
    const COMMIT_MESSAGE: string;
    const BUILD_BRANCH: string;
}
