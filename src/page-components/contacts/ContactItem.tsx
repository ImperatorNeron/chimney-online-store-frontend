const ContactItem: React.FC<ContactItemProps> = ({ icon, title, content }) => {
    return (
        <div className="flex items-start space-x-4 hover:scale-105 transform transition-all duration-300 cursor-default">
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-black">{title}</h3>
                {content}
            </div>
        </div>
    );
};

export default ContactItem;