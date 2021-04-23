import { pages } from '../config/webpack/pages';

type PagesType = typeof pages;

declare global {
    const SITE_PAGES: PagesType;
}
