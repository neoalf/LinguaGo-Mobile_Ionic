// Importación del plugin de red de Capacitor
import { Network } from '@capacitor/network';

/**
 * Servicio de Red
 * Monitorea el estado de conectividad de red
 */

export const NetworkService = {
    /**
     * Obtener estado actual de la red
     */
    async getStatus(): Promise<boolean> {
        const status = await Network.getStatus();
        return status.connected;
    },

    /**
     * Agregar escuchador para cambios en el estado de la red
     */
    addListener(callback: (connected: boolean) => void): void {
        Network.addListener('networkStatusChange', (status) => {
            callback(status.connected);
        });
    },

    /**
     * Eliminar todos los escuchadores de red
     */
    async removeAllListeners(): Promise<void> {
        await Network.removeAllListeners();
    },
};
