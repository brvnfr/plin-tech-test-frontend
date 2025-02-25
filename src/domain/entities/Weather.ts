import { WeatherType } from '@/schemas/weatherSchema';

export class Weather {
    constructor(private props: WeatherType) { }

    get city() {
        return this.props.city;
    }

    get temperature() {
        return this.props.temperature;
    }

    get description() {
        return this.props.description;
    }

    get icon() {
        return this.props.icon;
    }
}
