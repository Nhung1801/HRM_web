export interface OrganizationUnit {
  id: number;
  organizationCode: string;
  organizationName: string;
  abbreviation: string;
  employees: number;
  totalEmployees: number;
  employeeId?: number;
  organizational: string;
  unithead: string;
  status: string;
  level: number;
  rank: number;
  children: OrganizationUnit[];
  expanded?: boolean;
}

