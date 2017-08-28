export interface IRepoSearchResponse {
  total_count: number,
  items: IRepo[]
}

export interface IRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
  }
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
  size: number;
  commits: ICommit[]
}

export interface ICommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
      message: string;
    }
  }
  url: string;
}
