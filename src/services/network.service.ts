import { Network } from '@capacitor/network';

/**
 * Network Service
 * Monitors network connectivity status
 */

export const NetworkService = {
    /**
     * Get current network status
     */
    async getStatus(): Promise<boolean> {
        const status = await Network.getStatus();
        return status.connected;
    },

    /**
     * Add listener for network status changes
     */
    addListener(callback: (connected: boolean) => void): void {
        Network.addListener('networkStatusChange', (status) => {
            callback(status.connected);
        });
    },

    /**
     * Remove all network listeners
     */
    async removeAllListeners(): Promise<void> {
        await Network.removeAllListeners();
    },
};
