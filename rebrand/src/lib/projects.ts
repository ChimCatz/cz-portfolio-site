import type { ReadingEntry } from './reading';

// Helpers shared by the Projects page, the project pages and the homepage.

export type Project = ReadingEntry<'projects'>;

export type BadgeTone = 'purple' | 'blue' | 'green' | 'amber' | 'teal' | 'slate';
export interface Badge {
  label: string;
  value: string;
  tone: BadgeTone;
}

const STATUS_TONE: Record<Project['data']['status'], BadgeTone> = {
  ongoing: 'amber',
  shipped: 'green',
  superseded: 'slate',
};

/**
 * A project's badge row, always in the same order: status, version, build
 * date, the project's own extra badges, license. Version, date and license
 * only appear where the frontmatter has them.
 */
export function projectBadges(project: Project): Badge[] {
  const { status, version, built, license, badges } = project.data;
  return [
    { label: 'status', value: status, tone: STATUS_TONE[status] },
    ...(version ? [{ label: 'version', value: `v${version}`, tone: 'purple' as const }] : []),
    ...(built ? [{ label: 'built', value: built, tone: 'blue' as const }] : []),
    ...badges,
    ...(license ? [{ label: 'license', value: license, tone: 'teal' as const }] : []),
  ];
}

/** "Search & Filter Engine: From Hours ..." -> "Search & Filter Engine" */
export const shortTitle = (project: Project) => project.data.title.split(':')[0];

/** The line under the title: `tagline`, or the part of the title after the colon. */
export const tagline = (project: Project) => project.data.tagline ?? project.data.title.split(':')[1]?.trim();

/** Frame classes for a project's image. Every frame is the same shape; screenshots keep their top edge. */
export const shotClass = (project: Project) => [
  'shot',
  {
    'shot-screen': project.data.dashboards.length > 0 || project.data.thumbFocus === 'top',
    'shot-full': project.data.thumbFit === 'full',
  },
];

/** A `full` image doesn't fill the frame, so the frame takes the image's background color. */
export const shotStyle = (project: Project) =>
  project.data.thumbBg ? `background-color: ${project.data.thumbBg}` : undefined;
