// TODO: Fix the issue in tailwind CSS

const TimelineStep = ({ step, order, isCompleted, isCurrent, icon, description, isLastStep }) => {

    // Conditional classes for icon background and text colors
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
    const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';

    return (
        <li className="relative mb-6 sm:mb-0 sm:pl-10">
            <div className="flex items-center">
                <div
                    className={`z-10 flex items-center justify-center w-6 h-6 ${iconBgColor} ${iconTextColor} rounded-full ring-0 ring-white dark:ring-gray-900 shrink-0`}
                >
                    <i className={`ri-${icon.iconName} text-xl`}></i>
                </div>
                {!isLastStep && (
                    <div className={`hidden sm:flex w-full h-0.5 ${connectorColor} dark:bg-gray-700`}></div>
                )}
            </div>
            <div className="mt-3 sm:pe-8">
                <h3 className={`font-medium text-lg ${labelTextColor}`}>
                    {step.label}
                </h3>
                <br />
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
                </time>
                <p className={`text-base font-normal ${descriptionTextColor} dark:text-gray-400`}>
                    {description}
                </p>
            </div>
        </li>
    );
};

export default TimelineStep;