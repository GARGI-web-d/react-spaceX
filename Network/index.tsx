function parseLaunchResult(json: any): LaunchResult {
    return {
      id: json.id,
      name: json.name,
      date: json.date_utc,
      details: json.details,
      upcoming: json.upcoming,
      
    };
  }
  
  
  
 
  export async function fetchUpcomingLaunches(): Promise<LaunchResult[]> {
    const response = await fetch(
      'https://api.spacexdata.com/v4/launches/upcoming',
    );
    const content = await response.json();
  
    const arr: LaunchResult[] = [];
  
    Object.entries(content).forEach(([, value]) => {
      arr.push(parseLaunchResult(value));
    });
  
    return arr;
  }
  
  export interface LaunchResult {
    id: string;
    name: string;
    date: string;
    details?: string;
    upcoming: boolean;
  }
  
  
  
