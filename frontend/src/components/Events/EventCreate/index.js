import EventForm from '../EventForm';

function EventCreate() {
    const formType = 'createNew';

    return (
        <div id='main__narrow'>
            <h1>Host an Event</h1>

            <div id='content'>
                <EventForm formType={formType} />
            </div>
        </div>
    )
}

export default EventCreate;
