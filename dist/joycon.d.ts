import { default as AHRS } from 'ahrs';
import { JoyConEvents, JoyConLastValues, Quaternion, HomeLEDPattern } from './types.ts';
declare class JoyCon extends EventTarget {
    eventListenerAttached: boolean;
    quaternion: Quaternion;
    madgwick: AHRS;
    device: HIDDevice;
    lastValues: JoyConLastValues;
    ledstate: number;
    /**
     * Creates an instance of the JoyCon class.
     *
     * @param device - The HIDDevice instance representing the connected Joy-Con controller.
     *
     * Initializes the device and sets up the initial state for sensor values,
     * including timestamp, alpha, beta, and gamma.
     */
    constructor(device: HIDDevice);
    /**
     * Registers an event listener for a specific JoyCon event type.
     *
     * @typeParam K - The type of the JoyCon event to listen for, constrained to the keys of `JoyConEvents`.
     * @param type - The event type to listen for.
     * @param listener - The callback function that will be invoked when the event is dispatched.
     *                   The `this` context within the listener is bound to the current `JoyCon` instance,
     *                   and the event object is of the type corresponding to the event type.
     * @param options - Optional. An options object specifying characteristics about the event listener,
     *                  or a boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     */
    on<K extends keyof JoyConEvents>(type: K, listener: (this: JoyCon, ev: JoyConEvents[K]) => void, options?: boolean | AddEventListenerOptions): void;
    /**
     * Opens a connection to the Joy-Con device if it is not already opened,
     * and attaches an event listener for input reports.
     *
     * @returns {Promise<void>} A promise that resolves when the device is opened and the event listener is attached.
     */
    open(): Promise<void>;
    /**
     * Sends a request to the Joy-Con device to retrieve device information.
     *
     * This method sends a specific output report to the device and listens for a
     * "deviceinfo" event. When the event is received, it resolves with the device
     * information, excluding any raw or hexadecimal data fields.
     *
     * @returns A promise that resolves with the cleaned device information object.
     */
    getRequestDeviceInfo(): Promise<unknown>;
    /**
     * Requests the current battery level from the Joy-Con device.
     *
     * Sends a specific output report to the device to query the battery level,
     * then listens for a "batterylevel" custom event. Once the event is received,
     * it resolves with the battery level information, excluding any raw or hex data.
     *
     * @returns {Promise<unknown>} A promise that resolves with the cleaned battery level data.
     */
    getBatteryLevel(): Promise<unknown>;
    /**
     * Enables the Simple HID mode on the connected Joy-Con device.
     *
     * This method sends a specific output report to the device to switch it into
     * Simple HID mode, which allows for basic input/output communication.
     *
     * @returns {Promise<void>} A promise that resolves once the command has been sent.
     * @throws {DOMException} If the report cannot be sent to the device.
     */
    enableSimpleHIDMode(): Promise<void>;
    /**
     * Enables the "Standard Full Mode" on the Joy-Con device by sending the appropriate subcommand.
     *
     * This mode allows the Joy-Con to report all standard input data, including button presses,
     * analog stick positions, and sensor data. The method constructs the required data packet
     * and sends it to the device using the HID report protocol.
     *
     * @returns {Promise<void>} A promise that resolves once the command has been sent.
     * @throws {Error} If the device communication fails.
     */
    enableStandardFullMode(): Promise<void>;
    /**
     * Enables the IMU (Inertial Measurement Unit) mode on the Joy-Con device.
     *
     * Sends a subcommand to the device to activate the IMU, which allows the Joy-Con
     * to start reporting motion sensor data such as accelerometer and gyroscope readings.
     *
     * @returns A promise that resolves when the command has been sent to the device.
     * @throws Will throw an error if sending the report to the device fails.
     */
    enableIMUMode(): Promise<void>;
    /**
     * Disables the IMU (Inertial Measurement Unit) mode on the connected Joy-Con device.
     *
     * Sends a subcommand to the device to turn off IMU functionality, which includes
     * the accelerometer and gyroscope sensors. This can be useful for reducing power
     * consumption or when IMU data is not needed.
     *
     * @returns A promise that resolves when the command has been sent to the device.
     * @throws Will throw an error if sending the report to the device fails.
     */
    disableIMUMode(): Promise<void>;
    /**
     * Enables the vibration feature on the connected Joy-Con device.
     *
     * This method sends a specific output report to the device to activate vibration.
     * It constructs the required data packet, including the subcommand for enabling vibration,
     * and transmits it using the WebHID API.
     *
     * @returns A promise that resolves when the vibration command has been sent.
     * @throws {DOMException} If sending the report to the device fails.
     */
    enableVibration(): Promise<void>;
    /**
     * Disables the vibration feature on the connected Joy-Con controller.
     *
     * Sends a specific output report to the device to turn off vibration.
     * This method constructs the appropriate data packet and sends it using the WebHID API.
     *
     * @returns A promise that resolves when the vibration disable command has been sent.
     */
    disableVibration(): Promise<void>;
    /**
     * Enables RingCon.
     *
     * @memberof JoyCon
     * @seeAlso https://github.com/mascii/demo-of-ring-con-with-web-hid
     */
    enableRingCon(): Promise<void>;
    /**
     * Enables the USB HID joystick report mode for the connected device.
     *
     * This method checks if the device supports a specific output report (with reportId 0x80).
     * If supported, it sends a sequence of USB HID reports to the device to enable joystick reporting.
     * The sequence of reports is required to properly initialize the device for joystick input over USB.
     *
     * @returns {Promise<void>} A promise that resolves once the reports have been sent.
     */
    enableUSBHIDJoystickReport(): Promise<void>;
    /**
     * Sends a rumble (vibration) command to the Joy-Con device with the specified frequency and amplitude parameters.
     *
     * @param lowFrequency - The low frequency value for the rumble effect (in Hz). Must be between 40.875885 and 626.286133.
     * @param highFrequency - The high frequency value for the rumble effect (in Hz). Must be between 81.75177 and 1252.572266.
     * @param amplitude - The amplitude (strength) of the rumble effect. Must be between 0 (off) and 1 (maximum).
     * @returns A promise that resolves when the rumble command has been sent to the device.
     *
     * @remarks
     * This method encodes the frequency and amplitude values into the format expected by the Joy-Con hardware,
     * clamps the input values to their valid ranges, and sends the resulting data packet via HID.
     * The rumble effect is applied to both left and right motors of the Joy-Con.
     */
    rumble(lowFrequency: number, highFrequency: number, amplitude: number): Promise<void>;
    /**
     * Sets the blinking pattern for the Home LED on the Right Joy-Con device.
     *
     * Sends a subcommand to the device to control the Home LED.
     *
     * @param miniCycleDuration: Global mini cycle duration. 0-15. 0: off, 1: 8ms, ... , 15: 175ms
     * @param numCycles: Number of full cycles. 0-15. 0: repeat forever.
     * @param startIntensity: Initial LED intensity. 0-15.
     * @param cycleData: Array of {@link HomeLEDpatterns}. The maximum count of the array is 15.
     */
    setHomeLEDPattern(miniCycleDuration: number, numCycles: number, startIntensity: number, cycleData: HomeLEDPattern[]): Promise<void>;
    /**
     * Turn `on` or `off` the Home LED on the Right Joy-Con device.
     *
     * @param {boolean} on - If true, the LED will be turned on permanently. Turn the LED off otherwise.
     *
     */
    setHomeLED(on: boolean): Promise<void>;
    /**
     * Sets the LED state on the Joy-Con device.
     *
     * Sends a subcommand to the device to control the LED indicators.
     *
     * @param n - The LED state value to set. The value determines which LEDs are turned on or off.
     * @returns A promise that resolves when the command has been sent to the device.
     */
    setLEDState(n: number): Promise<void>;
    /**
     * Sets the specified LED on the Joy-Con controller.
     *
     * Updates the internal LED state by turning on the LED at the given index `n`,
     * then sends the updated state to the device.
     *
     * @param n - The index of the LED to turn on (0-based).
     * @returns A promise that resolves when the LED state has been updated.
     */
    setLED(n: number): Promise<void>;
    /**
     * Resets (turns off) the LED at the specified index by clearing its corresponding bits
     * in the internal LED state and updates the device.
     *
     * @param n - The index of the LED to reset (0-based).
     * @returns A promise that resolves when the LED state has been updated.
     */
    resetLED(n: number): Promise<void>;
    /**
     * Blinks the specified LED on the Joy-Con controller.
     *
     * This method updates the internal LED state by first turning off the LED at position `n`,
     * then setting the corresponding blink bit for that LED. It then sends the updated state
     * to the controller.
     *
     * @param n - The index of the LED to blink (typically 0-3).
     * @returns A promise that resolves when the LED state has been updated.
     */
    blinkLED(n: number): Promise<void>;
    /**
     * Handles the HID input report event from a Joy-Con device, parses the incoming data,
     * and emits structured input events based on the report type.
     *
     * @param event - The HID input report event containing the data, reportId, and device.
     * @remarks
     * This method processes different types of input reports (e.g., 0x3f, 0x21, 0x30) by parsing
     * the raw data using various PacketParser methods. It extracts information such as button status,
     * analog stick positions, battery level, accelerometer and gyroscope data, and device info.
     * The parsed data is then dispatched to relevant handlers and listeners.
     *
     * @private
     */
    _onInputReport({ data, reportId, device }: HIDInputReportEvent): void;
    /**
     * Dispatches a "deviceinfo" custom event with the provided device information as its detail.
     *
     * @param deviceInfo - The information about the device to be included in the event detail.
     */
    _receiveDeviceInfo(deviceInfo: unknown): void;
    /**
     * Dispatches a "batterylevel" custom event with the provided battery level detail.
     *
     * @param batteryLevel - The battery level information to include in the event detail.
     */
    _receiveBatteryLevel(batteryLevel: unknown): void;
    _receiveInputEvent(_packet: unknown): void;
}
declare class JoyConLeft extends JoyCon {
    /**
     * Handles an input event packet by removing specific button statuses and dispatching a custom "hidinput" event.
     *
     * @param packet - The input event data containing button statuses and other information.
     *
     * The method sets the following button statuses to `undefined` in the `buttonStatus` object:
     * - x
     * - y
     * - b
     * - a
     * - plus
     * - r
     * - zr
     * - home
     * - rightStick
     *
     * After modifying the packet, it dispatches a `CustomEvent` named "hidinput" with the modified packet as its detail.
     */
    _receiveInputEvent(packet: Record<string, unknown>): void;
}
declare class JoyConRight extends JoyCon {
    /**
     * Handles an input event packet from the Joy-Con device, sanitizes specific button statuses by setting them to `undefined`,
     * and dispatches a "hidinput" custom event with the modified packet as its detail.
     *
     * @param packet - The input event data received from the Joy-Con, expected to contain a `buttonStatus` property.
     */
    _receiveInputEvent(packet: Record<string, unknown>): void;
}
/**
 * Represents a general controller that extends the {@link JoyCon} class.
 *
 * This class is responsible for handling input events from a HID device and dispatching
 * them as custom "hidinput" events.
 *
 * @remarks
 * The {@link GeneralController} class provides a method to receive input packets from
 * the underlying HID device and dispatches them as custom events for further processing.
 *
 * @extends JoyCon
 */
declare class GeneralController extends JoyCon {
    /**
     * Dispatches a "hidinput" custom event with the provided packet as its detail.
     *
     * @param packet - The input data received from the HID device.
     */
    _receiveInputEvent(packet: unknown): void;
}
export { GeneralController, JoyConLeft, JoyConRight };
