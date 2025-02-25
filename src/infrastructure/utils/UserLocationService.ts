export class UserLocationService {
    async getLocation(): Promise<{ lat: number; lon: number }> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        resolve({ lat, lon });
                    },
                    (error) => reject(error)
                );
            } else {
                reject(new Error('Geolocalização não é suportada pelo navegador.'));
            }
        });
    }
}
