export interface Section {
  id: string;
  label: string;
}

export interface Project {
  number: string;
  title: string;
  type: string;
  year: string;
  description: string;
  tags: string[];
  className: string;
}
