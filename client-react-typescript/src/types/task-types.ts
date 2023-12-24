export interface TaskProps {
    title: string;
    id:number,
    desc: string;
    date: string,
    status: string;
    onUpdate: (id: number, title: string, description: string) => void;
    onDelete: (id: number) => void;
    handelComplete: (id: number) => void;
    handelunComplete: (id: number) => void;
}

export interface NewTask extends Pick<TaskProps,'title' | 'desc' | 'date'>
{
    catogery: string;
}
