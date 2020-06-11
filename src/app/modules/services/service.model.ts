export interface ServiceCategory {
    id: string;
    category: string;
    icon: string;
    tasks: { id: string, task: string}[];
}


export interface Task {
    id: string;
    task: string;
    rate: number;
    rate_type: string;
    rating: number;
}

export interface Order {
    order_id: string;
    ordered_time: string;
    service_category: string;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    task: Task;
    state: string;
    total_amount_charged: number;
    service_provider: {
        user_id: string;
        service_provider_name: string,
        email: string;
        profile_pic: string;
    };
    customer: {
        user_id: string;
        customer_name: string;
        email: string;
        profile_pic: string;
    };
}