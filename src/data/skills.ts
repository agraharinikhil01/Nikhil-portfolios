export type SkillCategory = {
  name: string
  items: string[]
}

export const SKILLS: SkillCategory[] = [
  {
    name: 'Languages',
    items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'Frontend',
    items: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Express.js', 'RESTful APIs'],
  },
  {
    name: 'Databases',
    items: ['MongoDB', 'MySQL'],
  },
  {
    name: 'Core Concepts',
    items: ['DSA', 'OOP', 'DBMS', 'OS'],
  },
  {
    name: 'Tools',
    items: ['Git', 'GitHub', 'Supabase', 'MapLibre/MapTiler'],
  },
]
