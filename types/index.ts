export interface Action {
    id: string;
    name: string;
    component: React.FC<ActionProps>;
}

export interface ActionProps {
    onComplete: () => void;
}