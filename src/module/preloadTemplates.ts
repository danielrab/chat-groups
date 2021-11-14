export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/chat-groups/templates"
  ];

  return loadTemplates(templatePaths);
}
