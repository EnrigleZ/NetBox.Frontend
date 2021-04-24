import { pages } from '../config/pages';

type PagesType = typeof pages;

declare global {
    const IS_DEV: boolean;
    const SITE_PAGES: PagesType;
}
