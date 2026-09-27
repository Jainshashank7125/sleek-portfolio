function isInternalPath(value) {
  return typeof value === 'string' && /^\/[a-z0-9][a-z0-9/_-]*$/i.test(value.trim());
}

function isExternalUrl(value) {
  if (typeof value !== 'string' || value.trim() === '') return false;

  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function resolveProjectActions(project) {
  const actions = [];

  if (project?.details && isInternalPath(project.projectDetailsPageSlug)) {
    actions.push({
      kind: 'detail',
      label: 'Read case study',
      href: project.projectDetailsPageSlug.trim(),
      external: false,
    });
  }

  if (isExternalUrl(project?.live)) {
    actions.push({
      kind: 'live',
      label: 'View live',
      href: project.live.trim(),
      external: true,
    });
  }

  if (isExternalUrl(project?.github)) {
    actions.push({
      kind: 'github',
      label: 'View source',
      href: project.github.trim(),
      external: true,
    });
  }

  return actions;
}
