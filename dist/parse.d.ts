import { Accelerometer, AccelerometerData, AnalogStick, BatteryLevel, CompleteButtonStatus, DeviceInfo, Gyroscope, GyroscopePacket, JoyConLastValues, ParsedPacketData, Quaternion, RingConDataPacket } from './types.ts';
/**
 * Converts gyroscope and accelerometer readings into Euler angles (alpha, beta, gamma).
 *
 * This function uses sensor fusion to estimate the orientation of a Joy-Con controller.
 * It updates the last known values with the current sensor readings and computes the
 * Euler angles in degrees, applying product-specific adjustments as needed.
 *
 * @param lastValues - The last known orientation values and timestamp.
 * @param gyroscope - The current gyroscope readings (angular velocity).
 * @param accelerometer - The current accelerometer readings (acceleration).
 * @param productId - The product ID of the Joy-Con, used for device-specific calculations.
 * @returns An object containing the Euler angles (`alpha`, `beta`, `gamma`) as strings, each formatted to six decimal places.
 */
export declare function toEulerAngles(lastValues: JoyConLastValues, gyroscope: Gyroscope, accelerometer: Accelerometer, productId: number): {
    alpha: string;
    beta: string;
    gamma: string;
};
/**
 * Converts a quaternion to Euler angles (alpha, beta, gamma) in degrees.
 *
 * @param q - The quaternion to convert.
 * @returns An object containing the Euler angles as strings with six decimal places:
 * - `alpha`: Rotation around the Z axis (in degrees).
 * - `beta`: Rotation around the X axis (in degrees).
 * - `gamma`: Rotation around the Y axis (in degrees).
 */
export declare function toEulerAnglesQuaternion(q: Quaternion): {
    alpha: string;
    beta: string;
    gamma: string;
};
/**
 * Converts gyroscope and accelerometer data to a quaternion representation.
 *
 * Depending on the provided `productId`, this function updates either the left or right Madgwick filter
 * with the given gyroscope and accelerometer values, and returns the resulting quaternion.
 *
 * @param gyro - The gyroscope data containing x, y, and z axis values.
 * @param accl - The accelerometer data containing x, y, and z axis values.
 * @param productId - The product identifier used to determine which Madgwick filter to update.
 * @returns The computed quaternion representing the orientation.
 */
export declare function toQuaternion(gyro: Gyroscope, accl: Accelerometer, productId: number): Quaternion;
export declare function parseDeviceInfo(rawData: Uint8Array): DeviceInfo & ParsedPacketData;
/**
 * Parses the input report ID from the provided raw data and string representation.
 *
 * @param rawData - The raw input data as a Uint8Array.
 * @param data - The string representation of the input data.
 * @returns A partial object containing the parsed input report ID, including the raw byte and its hexadecimal representation.
 */
export declare function parseInputReportID(rawData: Uint8Array, data: string): ParsedPacketData;
/**
 * Parses timer information from the provided raw data and string data.
 *
 * @param rawData - The raw data as a Uint8Array, typically representing a packet.
 * @param data - The string representation of the data.
 * @returns A partial object containing the timer information, including:
 *   - `_raw`: A slice of the raw data at index 1.
 *   - `_hex`: A slice of the string data at index 1.
 */
export declare function parseTimer(rawData: Uint8Array, data: string): ParsedPacketData;
/**
 * Parses the battery level information from the provided raw data and string data.
 *
 * @param rawData - The raw data as a Uint8Array, typically received from the device.
 * @param data - The string representation of the data, used for extracting battery information.
 * @returns A partial `ParsedPacketData` object containing:
 *   - `_raw`: The raw battery level byte (high nibble) extracted from `rawData`.
 *   - `_hex`: The hexadecimal string representation of the battery level.
 *   - `level`: The calculated battery level using `calculateBatteryLevel`.
 */
export declare function parseBatteryLevel(rawData: Uint8Array, data: string): BatteryLevel | ParsedPacketData;
export declare function parseConnectionInfo(rawData: Uint8Array, data: string): ParsedPacketData;
export declare function parseButtonStatus(rawData: Uint8Array, data: string): ParsedPacketData;
export declare function parseCompleteButtonStatus(rawData: Uint8Array, data: string): CompleteButtonStatus;
export declare function parseAnalogStick(rawData: Uint8Array, data: string): ParsedPacketData;
export declare function parseAnalogStickLeft(rawData: Uint8Array, data: string): AnalogStick | ParsedPacketData;
export declare function parseAnalogStickRight(rawData: Uint8Array, data: string): AnalogStick | ParsedPacketData;
export declare function parseFilter(rawData: Uint8Array, data: string): ParsedPacketData;
export declare function parseVibrator(rawData: Uint8Array, data: string): ParsedPacketData;
export declare function parseAck(rawData: Uint8Array, data: string): ParsedPacketData;
export declare function parseSubcommandID(rawData: Uint8Array, data: string): ParsedPacketData;
export declare function parseSubcommandReplyData(rawData: Uint8Array, data: string): ParsedPacketData;
export declare function parseAccelerometers(rawData: Uint8Array, data: string): AccelerometerData[];
export declare function parseGyroscopes(rawData: Uint8Array, data: string): (ParsedPacketData & GyroscopePacket)[][];
export declare function calculateActualAccelerometer(accelerometers: number[][]): {
    x: number;
    y: number;
    z: number;
};
export declare function calculateActualGyroscope(gyroscopes: number[][]): Gyroscope;
/**
 * Parses raw data from a Ring-Con device and extracts relevant information.
 *
 * @param rawData - The raw data buffer received from the device as a Uint8Array.
 * @param data - The raw data as a hexadecimal string.
 * @returns An object containing:
 *   - `_raw`: A slice of the raw data buffer.
 *   - `_hex`: A slice of the hexadecimal string.
 *   - `strain`: The strain value as a signed 16-bit integer, little-endian.
 */
export declare function parseRingCon(rawData: Uint8Array, data: string): RingConDataPacket & ParsedPacketData;
