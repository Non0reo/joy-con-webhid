import { GeneralController, JoyConLeft, JoyConRight } from './joycon.ts';
export * from './types.ts';
declare const connectedJoyCons: Map<number, JoyConLeft | JoyConRight | GeneralController>;
/**
 * Prompts the user to select and connect a Joy-Con device using the WebHID API.
 *
 * This function filters for Nintendo devices (vendor ID 0x057e) and allows the user
 * to select a Joy-Con controller from the available devices. Once selected, the device
 * is added to the application for further use.
 *
 * @returns A Promise that resolves when the connection process completes successfully,
 *          or rejects if an error occurs during device selection or connection.
 *
 * @throws Will log errors to console if device selection fails or if the addDevice
 *         operation encounters an error.
 *
 * @example
 * ```typescript
 * await connectJoyCon();
 * ```
 */
declare const connectJoyCon: () => Promise<void>;
export { connectJoyCon, connectedJoyCons, JoyConLeft, JoyConRight, GeneralController, };
